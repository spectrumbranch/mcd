var request = require('request');
var redis = require('redis');
var client;

var internals = {};

internals.init = function() {
  client = redis.createClient();
  
  client.on('error', internals.clientOnError());
  client.on('connect', internals.clientOnConnect());
};

internals.skinsNamespace = 'MCD_SKINS_';
internals.cacheExpiration = 5 * 60; // in seconds
internals.mojangSkinsBaseUrl = 'https://sessionserver.mojang.com/session/minecraft/profile/';


process.on('SIGHUP', function() {
  console.log('skins: Closing redis connection.');
  client.quit();
  process.exit();
});

internals.getSkinForUUID = function(uuid, cb) {
  var strippedUUID = uuid.replace(/-/g,'');
  internals._getSkinForUUID(strippedUUID,cb);
};

internals.clientOnError = function() {
  return function(err) {
    console.log('!!! Redis skins client error: ', err);
    client.quit();
  };
};

internals.clientOnConnect = function() {
  return function() {
    console.log('^^^ Redis skins client connected.');
  };
}

internals._getSkinForUUID = function(uuid, cb) {
  var key = internals.skinsNamespace + uuid;
  client.get(key, function(err, reply) {
    if (reply) {
      cb(err,reply);
    } else {
      // doesn't exist (anymore?), go get it
      internals.getSkinFromMojang(uuid, function(err2, skin) {
        if (err2 || skin == null) {
          cb(err2, null);
        } else {
	
          var skinDecoded = internals.decodeRawSkin(skin);
          internals.storeSkin(uuid, skinDecoded, function(err3, success) {
            if (success) {
              cb(null, skinDecoded);
            } else {
              //purposefully left dead code since we may want to do something later with this scenario
              cb(err3, skinDecoded);
            }
          });
        }
      });
    }
  });
};

internals.getSkinFromMojang = function(uuid, cb) {
  request(internals.mojangSkinsBaseUrl + uuid, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log('%%% Response from Mojang:\n', body);
      var bodyjson = JSON.parse(body);
      if (bodyjson.properties && bodyjson.properties[0] && bodyjson.properties[0].value) {
        cb(null, bodyjson.properties[0].value);
      } else {
        cb(null, null);
      }
    } else {
      cb(err);
    }
  });
};

internals.storeSkin = function(uuid, skin, cb) {
  var key = internals.skinsNamespace + uuid;
  if (skin) {
	client.set(key, skin, redis.print);
	client.expire(key, internals.cacheExpiration);
  } else {
	console.log('!!! storeSkin: skin is null or undefined');
  }
  
  cb(null, true);
};

//synchronous
internals.decodeRawSkin = function(rawSkin) {
	var output = null;
	var decodedBase64 = internals.decodeBase64(rawSkin);
	console.log('Decoding skin');
	var skinsjson = JSON.parse(decodedBase64)
	if (skinsjson.textures) {
		console.log('Skins JSON has textures field.');
		if (skinsjson.textures.SKIN) {
			console.log('Skins JSON has textures.SKIN field.');
			if (skinsjson.textures.SKIN.url) {
				console.log('Skins JSON has textures.SKIN.url field.');
				output = skinsjson.textures.SKIN.url;
			} else {
				console.log('Skins JSON does not have textures.SKIN.url field.');
			}
		} else {
			console.log('Skins JSON does not have textures.SKIN field.');
		}
	} else {
		console.log('Skins JSON does not have textures field.');
	}
	return output;
}

internals.decodeBase64 = function(input) {
	var output = (new Buffer(input, 'base64')).toString();
	console.log('%%% Decoded base64:\n', output);
	return output;
}

internals.init();
exports.getSkinForUUID = internals.getSkinForUUID;
