import { useGetCurrentUserQuery, useGetUserQuery } from '../RTK/features/user/userApi';

const useCurrentUser = () => {
    const { data: user, isLoading: loading, error: err } = useGetCurrentUserQuery() || null;
    const { data, isLoading, isError, error } = useGetUserQuery(user?.email) || null;
    return [data, isLoading, isError, error, loading, err]
};

export default useCurrentUser;