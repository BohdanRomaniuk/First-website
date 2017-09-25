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

function ShowPostTitle(container)
{
	alert(container.innerHTML);
}