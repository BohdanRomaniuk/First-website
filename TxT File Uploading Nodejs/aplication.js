var fileSystem = require('fs');

fileSystem.readFile('input.txt', 'UTF-8', function (inputFile, error) 
{
  if (error)
  {
	  console.log(error);
  }
  console.log(inputFile);
  return true;
});