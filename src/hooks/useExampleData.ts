import { useQuery } from '@tanstack/react-query';
import { fetchExampleData } from '../services/exampleService';

const useExampleData = () => {
  return useQuery({ queryKey: ['exampleData'], queryFn: fetchExampleData });
};

export default useExampleData;