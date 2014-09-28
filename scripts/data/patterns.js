// see : http://minecraft.gamepedia.com/Server#Death_messages
module.exports = {
	"patterns": [
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+)\[\/((?:\d+[\.:]){4}\d+)\] logged in with entity id \d+ at \(([-\d\.]+), ([-\d\.]+), ([-\d\.]+)\)/,
			"output": ['time', 'user', 'ip', 'x', 'y', 'z']
		},
		{
			"name": "kill",
			"pattern": /^(?:\[)(\d+:\d+:\d+)(?:\] \[Server thread\/INFO\]: )(\w+)(?: was slain by )(\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) blew up/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) burned to death/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) died/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) drowned(?: whilst trying to escape (\w+))?/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell from a high place(?: and fell out of the world)?/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell into a patch of cacti/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell into a patch of fire/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell off a ladder/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell off some vines/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell out of the water/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) fell out of the world/,
			"output": ['time', 'target']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) got finished off by (\w+)(?: using \[(\w+)\])?/,
			"output": ['time', 'target', 'actor', 'weapon']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) hit the ground too hard/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) starved to death/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) suffocated in a wall/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) tried to swim in lava(?: while trying to escape (\w+))?/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) walked into a cactus whilst trying to escape (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) walked into a fire whilst fighting (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was blown from a high place by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was blown up by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was burnt to a crisp whilst fighting (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was doomed to fall(?: \(by (\w+)\))?/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was fireballed by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was killed by (\w+) using (magic)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was killed by magic/,
			"output": ['time', 'target']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was killed while trying to hurt (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was knocked into the void by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was pricked to death/,
			"output": ['time', 'target']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was shot by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was shot off a ladder by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was shot off some vines by (\w+)/,
			"output": ['time', 'target', 'actor']
		},
		{
			"name": "kill",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was slain by (\w+)(?: using \[(\w+)\])?/,
			"output": ['time', 'target', 'actor', 'weapon']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was squashed by a falling anvil/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) was struck by lightning/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) went up in flames/,
			"output": ['time', 'target']
		},
		{
			"name": "death",
			"pattern": /^\[(\d+:\d+:\d+)\] \[Server thread\/INFO\]: (\w+) withered away/,
			"output": ['time', 'target']
		}
	]
}