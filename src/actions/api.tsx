import axios from "axios";

const baseUrl = "http://localhost:4000/";
const wikiUrl = "https://en.wikipedia.org/w/api.php";
export default {
  aquaria(url = baseUrl + "aquaria/") {
    return {
      fetchAll: (data: any) => axios.get(url, { params: data }),
      fetchById: (id: string) => axios.get(url + id),
      create: (newRecord: any) => axios.post(url, newRecord),
      update: (id: string, updatedRecord: any) =>
        axios.put(url + id, updatedRecord),
      delete: (id: string) => axios.delete(url + id),
      searchWiki: (search: any) => axios.get(wikiUrl, { params: search }),
    };
  },
};
