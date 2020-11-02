const base_url = "https://api.football-data.org/v2";
const api_token = "d48a465242fa42c4a9f6bca5f603a83b";
const id_liga = 2019;
const endpoint_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_matches = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const endpoint_detail_team = `${base_url}/teams/`;
const endpoint_detail_match = `${base_url}/matches/`;
const endpoint_detail_player = `${base_url}/players/`;
const typeTeam = "team";
const typeMatch = "match";
const typePlayer = "player";
const storeNameTeam = "favorite_team";
const storeNameMatch = "favorite_match";
const storeNamePlayer = "favorite_player";

function status(response) {
    if (response.status !== 200) {
        console.log("[API.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("[API.js][error] Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": "d48a465242fa42c4a9f6bca5f603a83b"
        }
    });
}

function getStandings() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_standings).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultStandingsJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_standings)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultStandingsJSON(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getMatches() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_matches).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultMatchesJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_matches)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultMatchesJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getTeamDetail(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_team + teamID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultTeamInfoJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detail_team + teamID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultTeamInfoJSON(data);
                resolve(data);
            })
        .catch(error);
    });  
}

function getMatchDetail(matchID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_match + matchID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultMatchDetailJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_detail_match + matchID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultMatchDetailJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getPlayerDetail(playerID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_player + playerID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultPlayerDetailJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(endpoint_detail_player + playerID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultPlayerDetailJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function tabFavorite(type) {
    if (type == typeTeam) {
        getAllFavorites(storeNameTeam).then(function(data) {
            getResultTeamFavoritesJSON(data);
        });
    }
    else if(type == typeMatch) {
        getAllFavorites(storeNameMatch).then(function(data) {
            getResultMatchFavoritesJSON(data);
        });
    }
    else if(type == typePlayer) {
        getAllFavorites(storeNamePlayer).then(function(data) {
            getResultPlayerFavoritesJSON(data); 
        });
    }
}

function getFavoriteById(ID, type) {
    if (type == typeTeam) {
        getById(ID, storeNameTeam).then(function(data) {
            getResultTeamInfoJSON(data);
        });
    }
    else if (type == typeMatch) {
        getById(ID, storeNameMatch).then(function(data) {
            getResultMatchDetailJSON(data);
        })
    }
    else if (type == typePlayer) {
        getById(ID, storeNamePlayer).then(function(data) {
            getResultPlayerDetailJSON(data);
        })
    }
}