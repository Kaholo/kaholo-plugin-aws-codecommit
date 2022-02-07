function parseArray(value){
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof(value) === "string") return value.split("\n").map(line=>line.trim()).filter(line=>line);
    return [value];
}

function parseTags(value){
    if (!value) return undefined;
    if (Array.isArray(value)){
        if (!value.every(tag => tag.Key)){
            throw "Bad AWS Tags Format";
        }
        return value;
    }
    if (typeof(value) === "string"){
        value = value.split("\n").map(line=>line.trim()).filter(line=>line);
        return value.map((line) => {
            let [key, ...val] = line.split("=");
            if (!val.length) return { Key: key }
            val = val.join("=");
            return { Key: key, Value: val };
        });
    }
    if (typeof(value) === "object"){
        return Object.entries(value).map(([key, val]) =>
             val ? { Key: key, Value: val } : { Key: key });
    }
    throw "Unsupported tags format!";
}

module.exports = {
    boolean : (value) =>{
        if (value === undefined || value === null || value === '') return undefined;
        return !!(value && value !=="false")
    },
    text : (value) =>{
        if (value)
            return value.split('\n');
        return undefined;
    },
    number: (value)=>{
        if (!value) return undefined;
        const parsed = parseInt(value);
        if (parsed === NaN) {
            throw `Value ${value} is not a valid number`
        }
        return parsed;
    },
    autocomplete: (value)=>{
        if (!value) return undefined;
        if (value.id) return value.id;
        return value;
    },
    string: (value)=>{
        if (!value) return undefined;
        if (typeof(value) === "string") return value.trim();
        throw `Value ${value} is not a valid string`;
    },
    array: parseArray,
    tags: parseTags
}