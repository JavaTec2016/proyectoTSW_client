import type { DataProvider } from "react-admin";
import API from "./api";
export const dataProvider:DataProvider = {
  getList: async (resource, { pagination, sort, filter }) => {
    const { page, perPage } = pagination;
    const data = await api.get(`/${resource}`, {
      params: { _page: page, _limit: perPage, _sort: sort.field, _order: sort.order, ...filter }
    });
    return { data: data.items, total: data.total };
  },

  getOne: async (resource, { id }) => {
    const data = await api.get(`/${resource}/${id}`);
    return { data };
  },

  create: async (resource, { data }) => {
    const result = await api.post(`/${resource}`, data);
    return { data: result };
  },

  update: async (resource, { id, data }) => {
    const result = await api.put(`/${resource}/${id}`, data);
    return { data: result };
  },

  delete: async (resource, { id }) => {
    await api.delete(`/${resource}/${id}`);
    return { data: { id } };
  },

  // Requerido por React Admin para selects y referencias
  getMany: async (resource, { ids }) => {
    const data = await Promise.all(ids.map(id => api.get(`/${resource}/${id}`)));
    return { data };
  },

  getManyReference: async (resource, params) => {
    const data = await api.get(`/${resource}`, { params: { [params.target]: params.id } });
    return { data: data.items, total: data.total };
  },
};