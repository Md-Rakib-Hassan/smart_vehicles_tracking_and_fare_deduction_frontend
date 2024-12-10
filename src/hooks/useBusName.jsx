import useAxios from "./useAxios";
import { useState } from 'react';

const useBusName = (name) => {
    const [id, setId] = useState(null);
    const axios = useAxios();
    axios.get(`/get-bus-id/${name}`).then(res => setId(res.data));
    return id;
};

export default useBusName;