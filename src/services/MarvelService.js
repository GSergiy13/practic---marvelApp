class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=2a9bc7f7e0a80ba827d8ef87e7733b18';

    getResource = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            return new Error(`Clould not feact - ${url} status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`);

        return res.data.results.map(this._transformCharacter);
    }



    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey }`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0,100) + '...' : 'Опису немає!',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage:  char.urls[0].url,
            wikil: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default  MarvelService;