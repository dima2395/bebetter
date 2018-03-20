import axios from "axios";
import Immutable from "immutable";

const config = {
  baseURL: "/api/",
  transformResponse: [
    function(data) {
      const immutableData = Immutable.fromJS(JSON.parse(data));
      return immutableData;
    }
  ]
};

const api_axios = axios.create(config);

const api = {
  notes: {
    get: (id = "") => {
      return api_axios.get(`/notes/${id}`);
    },
    create: note => {
      return api_axios.post("/notes", {
        ...note
      });
    },
    update: (id, note) => {
      return api_axios.put(`/notes/${id}`, {
        ...note
      });
    },
    delete: id => {
      return api_axios.delete(`/notes/${id}`);
    }
  },

  routines: {
    get: (id = "") => {
      return api_axios.get(`/routines/${id}`);
    },
    create: routine => {
      return api_axios.post("/routines", { routine });
    },
    update: (id, routine) => {
      return api_axios.put(`/routines/${id}`, {
        routine
      });
    },
    delete: id => {
      return api_axios.delete(`/routines/${id}`);
    },
    progress: {
      get: (routine_id = "") => {
        return api_axios.get(`/routines/${routine_id}/progress`);
      },
      update: (routine_id, daily_progress) => {
        return api_axios.post(`/routines/${routine_id}/progress`, {
          daily_progress
        });
      }
    }
  }
};

export default api;
