var fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Що хочете записти у файл? ', function (message)
{
  fs.writeFile('output.txt', message, function (error)
  {
	if(error)
	{
		console.log(error);
	}
	console.log('Дані успішно збережно у файл output.txt');
  });
  rl.close();
});

