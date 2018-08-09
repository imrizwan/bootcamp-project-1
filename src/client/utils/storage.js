export function getFromStorage(key) {
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        return null;
    }
}

export function setInStorage(key, object) {
    if (!key) {
        console.log("Error, key is missing!");
    }

    try {
        localStorage.setItem(key, JSON.stringify(object));
    } catch (err) {
        console.error("ERROR: ", err);
    }
}