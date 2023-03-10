import { Category } from 'src/types/category.type';
import { SuccessResponseApi } from 'src/types/util.type.ts';
import httpRequest from 'src/utils/http';

const URL = 'categories';

const categoryService = {
    getCategories: () => {
        return httpRequest.get<SuccessResponseApi<Category[]>>(URL);
    },
};

export default categoryService;
