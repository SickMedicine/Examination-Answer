async function invokeMethod(method) {
    const idInstance = document.getElementById('idInstance').value;
    const ApiTokenInstance = document.getElementById('ApiTokenInstance').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('message').value;
    const urlFile = document.getElementById('urlFile').value;
    const fileName = document.getElementById('fileName').value;
    const caption = document.getElementById('caption').value;

    let body = null;
    if (method === 'sendMessage') {
        body = {
            phoneNumber: phoneNumber,
            message: message
        };
    } else if (method === 'sendFileByUrl') {
        body = {
            phoneNumber: phoneNumber,
            urlFile: urlFile,
            fileName: fileName,
            caption: caption
        };
    }

    const response = await fetch(`/api/${method}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idInstance,
            ApiTokenInstance,
            body
        })
    });

    const data = await response.json();
    document.getElementById('response').value = JSON.stringify(data, null, 2);
}
