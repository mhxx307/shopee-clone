import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash/omit';
import { useForm } from 'react-hook-form';
import useQueryConfig from './useQueryConfig';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constants';
import getSchema, { Schema } from 'src/utils/schema';

type FormData = Pick<Schema, 'name'>;
const nameSchema = getSchema().pick(['name']);

export default function useSearchProducts() {
    const queryConfig = useQueryConfig();

    const { register, handleSubmit } = useForm<FormData>({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(nameSchema),
    });
    const navigate = useNavigate();

    const onSubmitSearch = handleSubmit((data) => {
        const config = queryConfig.order
            ? omit(
                  {
                      ...queryConfig,
                      name: data.name,
                  },
                  ['order', 'sort_by'],
              )
            : {
                  ...queryConfig,
                  name: data.name,
              };
        navigate({
            pathname: path.home,
            search: createSearchParams(config).toString(),
        });
    });
    return { onSubmitSearch, register };
}
