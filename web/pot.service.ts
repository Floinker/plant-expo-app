export type PotConfig = {
  id: number;
  ipAddress: string;
  warnDuration: string;
  warnThreshold: string;
  waterAmount: number;
};

export type WaterLevel = {
  waterLevel: number;
};

export type Humidity = {
  humidity: number;
};

export const getPots = () => {
  return fetch('http://192.168.1.237:8080/stats/pots', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as PotConfig[];
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCurrentPotWaterLevel = (potId: number) => {
  return fetch(
    'http://192.168.1.237:8080/stats/pots/' + potId + '/water-level',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as WaterLevel;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCurrentPotHumidity = (potId: number) => {
  return fetch('http://192.168.1.237:8080/stats/pots/' + potId + '/humidity', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as Humidity;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPlantPotDetails = (potId: number) => {
  return fetch('http://192.168.1.237:8080/stats/pots/' + potId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

export const getPotWaterLevelHistory = (potId: number) => {
  return fetch(
    'http://192.168.1.237:8080/stats/pots/' + potId + '/water-level/history',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as WaterLevel[];
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPotHumidityHistory = (potId: number) => {
  return fetch(
    'http://192.168.1.237:8080/stats/pots/' + potId + '/humidity/history',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json as Humidity[];
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postIdentify = (potId: number, duration: number) => {
  return fetch('http://192.168.1.237:8080/stats/pots/' + potId + '/identify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ duration: duration }),
  });
};

export const postActivatePump = (potId: number) => {
  return fetch(
    'http://192.168.1.237:8080/stats/pots/' + potId + '/activate-pump',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ waterAmount: 10 }),
    }
  );
};

export const pingPot = (potId: number) => {
  return fetch('http://192.168.1.237:8080/stats/pots/' + potId + '/ping', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const putSettings = (potId: number, potConfig: PotConfig) => {
  return fetch('http://192.168.1.237:8080/stats/pots/' + potId + '/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(potConfig),
  });
};
