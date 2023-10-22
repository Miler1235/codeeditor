// This function updates the content of an iframe (output) based on the user's input in the HTML, CSS, and JavaScript code areas.

function run() {
    
    // Get references to the HTML, CSS, and JavaScript code input areas and the output iframe.
    
    let htmlCode = document.getElementById("html-code");
    let cssCode = document.getElementById("css-code");
    let jsCode = document.getElementById("js-code");
    let output = document.getElementById("output");

    // Update the content of the output iframe by combining the HTML and CSS code with JavaScript evaluation.
   
    output.contentDocument.body.innerHTML = htmlCode.value + "<style>" + cssCode.value + "</style";

    // Evaluate and execute the JavaScript code within the output iframe.
   
    output.contentWindow.eval(jsCode.value);
}



document.querySelectorAll(".copyButton").forEach(button => {
    button.addEventListener("click", function () {
       
        // Get the textarea element based on its data-textarea attribute
       
        const textareaId = this.getAttribute("data-textarea");
        const codeTextarea = document.getElementById(textareaId);

        // Select and copy the text to the clipboard
        
        codeTextarea.select();
        document.execCommand("copy");

        // Change the button text temporarily to indicate it was copied
        
        this.innerText = "Copied!";
        setTimeout(() => {
            this.innerText = `Copy ${textareaId.replace("-code", "")}`;
        }, 1500);
    });
});

document.querySelectorAll(".saveButton").forEach(button => {
    button.addEventListener("click", function () {
        const textareaId = this.getAttribute("data-textarea");
        const codeTextarea = document.getElementById(textareaId);

        // Get the content of the textarea
        const codeContent = codeTextarea.value;

        // Create a Blob (binary large object) with the content
        const blob = new Blob([codeContent], { type: "text/plain" });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a download link
        const a = document.createElement("a");
        a.href = url;
        a.download = `${textareaId.replace("-code", "")}.txt`; // Set the file name

        // Trigger a click event to start the download
        a.click();

        // Clean up by revoking the Blob URL
        window.URL.revokeObjectURL(url);
    });
});

document.querySelectorAll(".lockButton").forEach(button => {
    button.addEventListener("click", function () {
        const textareaId = this.getAttribute("data-textarea");
        const codeTextarea = document.getElementById(textareaId);

        // Toggle the readonly property
        codeTextarea.readOnly = !codeTextarea.readOnly;

        // Update the button text
        this.innerText = codeTextarea.readOnly ? "Unlock" : "Lock";
    });
});


