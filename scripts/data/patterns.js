// see : http://minecraft.gamepedia.com/Server#Death_messages
module.exports = {
	"patterns": [
		{
			"name": "kill",
			"pattern": /^(?:\[)(\d+:\d+:\d+)(?:\] \[Server thread\/INFO\]: )(\w+)(?: was slain by )(\w+)/,
			"output": ['time', 'target', 'actor']

		}
	]
}
