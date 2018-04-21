import axios from "axios";
import Immutable from "immutable";
import { store } from "store";
import { addMessage } from "reducers/messages";

const config = {
  baseURL: "/api/",
  transformResponse: [
    function (data) {
      const immutableData = Immutable.fromJS(JSON.parse(data));
      const message = immutableData.get("message");
      if (message) {
        // if response data has massage dispatch it
        store.dispatch(addMessage(message));
      }
      return immutableData;
    }
  ]
};

const apiAxios = axios.create(config);

const api = {
  notes: {
    get: (id = "") => {
      return apiAxios.get(`/notes/${id}`);
    },
    create: note => {
      return apiAxios.post("/notes", {
        ...note
      });
    },
    update: (id, note) => {
      return apiAxios.put(`/notes/${id}`, {
        ...note
      });
    },
    delete: id => {
      return apiAxios.delete(`/notes/${id}`);
    }
  },

  routines: {
    get: (id = "") => {
      return apiAxios.get(`/routines/${id}`);
    },
    create: routine => {
      return apiAxios.post("/routines", { routine });
    },
    update: (id, routine) => {
      return apiAxios.put(`/routines/${id}`, {
        routine
      });
    },
    delete: id => {
      return apiAxios.delete(`/routines/${id}`);
    },
    progress: {
      get: (routineId = "") => {
        return apiAxios.get(`/routines/${routineId}/progress`);
      },
      update: (routineId, dailyProgress) => {
        return apiAxios.post(`/routines/${routineId}/progress`, {
          dailyProgress
        });
      }
    }
  }
};

export default api;
