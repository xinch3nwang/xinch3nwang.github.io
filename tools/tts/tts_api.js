async function textToSpeech(str) {
  const url = 'https://ms-tts-api.vercel.app/ra/api'//'https://ms-tts-api.onrender.com/api/ra'//;
  const headers = {
    'Content-Type': 'text/plain',
    'token': ''
  };
  const body = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
    <voice name="zh-CN-YunXiNeural">
      ${str}
    </voice>
  </speak>`;

  try {
    console.log('Sending request to:', url);
    console.log('Request headers:', headers);
    console.log('Request body:', body);
    console.log('Initiating fetch request...');
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
      // mode: 'no-cors'
    });
    console.log('Fetch request completed');
    console.log('Response received:', response);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.blob();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default textToSpeech;