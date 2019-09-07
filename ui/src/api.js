const API_URL = 'http://fantethy-api.docker';

const handleResponse = (resp) => {
  let finalResp = {};
  if (!resp.ok) {
    finalResp = { resp };
  } else if (resp) {
    finalResp = resp.json();
  } else {
    finalResp = { resp };
  }
  return finalResp;
};

const headerType = { Accept: 'application/json', 'Content-Type': 'application/json' };

export const getRequest = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return handleResponse(response);
};

export const addPlayers = async (user, player) => {
  const response = await fetch(`${API_URL}/${user}`, {
    method: 'POST',
    headers: headerType,
    body: JSON.stringify({ player }),
  });
  return handleResponse(response);
};
