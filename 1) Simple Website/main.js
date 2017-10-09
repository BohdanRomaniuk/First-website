function ShowImageFullSize(image)
{
	if(image.style.maxWidth=="1000px")
	{
		image.style.maxWidth="300px";
	}
	else
	{
		image.style.maxWidth="1000px";
	}	
}
	
function ChangeColorToBlue(element)
{
	element.style.color = "#07e4d1";
	element.style.fontStyle = "italic";
}

function ChangeColorToGreen(element)
{
	element.style.color = "#83e407";
	element.style.fontStyle = "normal";
}

function ChangePostsColor()
{
	var posts = document.getElementsByClassName('post-text');
	for(i=0; i<posts.length; i++)
	{
		if(posts[i].style.color=='red')
		{
			posts[i].style.color='green';
		}
		else
		{
			posts[i].style.color='red';
		}
	}
}

function ChangeOperand(newOperand)
{
	var operand = document.getElementById("operand");
	operand.innerHTML = newOperand;
}
function Calculate()
{
	var firstOperand = document.getElementById("first").value;
	var secondOperand = document.getElementById("second").value;
	
	var operation;
	var allOperation = document.getElementsByName("operation");
	for(var i=0; i<allOperation.length; ++i)
	{
		if(allOperation[i].checked)
		{
			operation = allOperation[i].value;
			break;
		}
	}
	
	firstOperand = parseFloat(firstOperand);
	secondOperand = parseFloat(secondOperand);
	var result = 0;
	switch(operation)
	{
		case "plus":
			result = firstOperand + secondOperand;
			break;
		case "minus":
			result = firstOperand - secondOperand;
			break;
		case "mult":
			result = firstOperand * secondOperand;
			break;
		case "div":
			result = firstOperand / secondOperand;
			break;
	}
	document.getElementById("result").value = result;
}