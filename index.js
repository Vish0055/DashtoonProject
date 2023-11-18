async function query(data) {
	try{
		const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
	}
	catch (error) {
        console.error("Error calling API:", error);
		let errorMessage=document.createElement('p');
		errorMessage.classList="errorClass"
        errorMessage.textContent = "Error generating images. Please try again later.";
		errorMessage.style.textAlign="center";
		let gridCon=document.createElement("div");
		gridCon.className="imgSpeechBox";
		gridCon.appendChild(errorMessage);
		container.appendChild(gridCon);

        return null;
    }
}
let myMsg;
const container = document.getElementById("image-container");

let msg="apple falling from the tree"
document.getElementById("myButton").addEventListener("click", function() {
	myMsg = document.getElementById('input-msg').value;
	console.log(myMsg)
	container.innerHTML = '';

	for (let i = 0; i < 10; i++) {
		query({"inputs": msg}).then((blob) => {
		let imageUrl = URL.createObjectURL(blob);
		let imageElement = document.createElement("img");
		imageElement.src = imageUrl;
		let gridCon=document.createElement("div");
		gridCon.className="imgSpeechBox";
		imageElement.onerror = function() {
			this.style.display = "none";
			let retryElement = document.createElement("div");
			retryElement.textContent = "Image failed to load. Retry";
			retryElement.style.textAlign = "center";
			this.parentNode.appendChild(retryElement);
		};

		gridCon.appendChild(imageElement);
		container.appendChild(gridCon);
		createSpeechBubble(imageElement, "Speech Bubble Text");
		})
		// let gridCon=document.createElement("div");
		// gridCon.className="imgSpeechBox";
		// let imageElement = document.createElement("img");
		// imageElement.src = "https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png";
		// gridCon.appendChild(imageElement);
		// container.appendChild(gridCon);
		//createSpeechBubble(imageElement, "Speech Bubble Text");
	}
 });

 function createSpeechBubble(imageElement, textContent) {
    const speechBubbleText = document.createElement('p');
    speechBubbleText.textContent = textContent;
    imageElement.parentNode.appendChild(speechBubbleText);
}



