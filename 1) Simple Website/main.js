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

var slideIndex = 1;
ShowImages(slideIndex);

function NextImage(step) {
  ShowImages(slideIndex += step);
}

function ShowImages(step) {
	var photos = document.getElementsByClassName("my-photo");
	if (step > photos.length)
	{
		slideIndex = 1
	}    
	if (step < 1) 
	{
		slideIndex = photos.length
	}
	for (var i = 0; i < photos.length; i++) 
	{
		photos[i].style.display = "none";  
	}
	photos[slideIndex-1].style.display = "block";  
}