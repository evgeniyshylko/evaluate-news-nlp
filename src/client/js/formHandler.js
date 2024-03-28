// Pos
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

function handleSubmit(event) {
    event.preventDefault()
    const nodeServerUrl = 'http://localhost:8081/';
    let formText = document.getElementById('name').value

    Client.validateInput(formText);

    console.log("::: Form Submitted :::")

    postData(nodeServerUrl + 'analyse', { text: formText })
        .then(function (res) {
            if (res !== null && res !== '') {
                document.getElementById('irony').value = res.irony;
                document.getElementById('confidence').value = res.confidence;
                document.getElementById('agreement').value = res.agreement;
                document.getElementById('subjectivity').value = res.subjectivity;
            } else {
                alert("Failed to load NLP data!");
            }
        });


}

export { handleSubmit }
