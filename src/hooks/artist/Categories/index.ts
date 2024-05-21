import {useQuery, useMutation, useInfiniteQuery} from 'react-query';
import {
  Category_GetCategoriesQuery,
  Category_GetCategoriesQueryVariables,
  UserCategory_CreateByCategoryIdsMutationVariables,
  UserCategory_CreateByCategoryIdsMutation,
  Category_CreateCategoryMutation,
  Category_CreateCategoryMutationVariables,
  Post_GetPostsByCategoryAndFileType,
  Post_GetPostsByCategoryAndFileTypeQueryVariables,
} from '~/generated/graphql';
import {
  GET_ALL_CATEGORIES,
  post_getPostsByCategoryAndFileType,
} from '~/graphql/artist/Categories/queries';
import {
  CREATE_CATEGORIES,
  CREATE_USER_CATEGORIES,
} from '~/graphql/artist/Categories/mutations';
import graphQLClient, {fetcher} from '~/graphql/fetcher';
import {queryKeys} from '~/constants/queryKeys';
import snackBar from '~/utils/snackBar';
import {Colors} from '~/styles/colors';
import {PAGE_SIZE} from '~/constants/pagination';

export const useGetAllCategories = ({
  where,
  options,
}: {
  where?: any;
  options?: any;
}) => {
  return useQuery<
    Category_GetCategoriesQuery,
    any,
    Category_GetCategoriesQueryVariables
  >(
    [queryKeys.getAllCategoriesAdmin, where],
    () => {
      return fetcher<
        Category_GetCategoriesQuery,
        Category_GetCategoriesQueryVariables
      >(GET_ALL_CATEGORIES, {where})();
    },
    {...options},
  );
};

export const useGetAllCategoriesArtist = ({options}: {options?: any}) => {
  return useQuery<
    Category_GetCategoriesQuery,
    any,
    Category_GetCategoriesQueryVariables
  >(
    [queryKeys.getAllCategories],
    () => {
      return fetcher<
        Category_GetCategoriesQuery,
        Category_GetCategoriesQueryVariables
      >(GET_ALL_CATEGORIES, {take: 1000, order: [{id: 'DESC'}]})();
    },
    {...options},
  );
};

export const useGetCategories = (options?: any, order?: any) => {
  return useInfiniteQuery<
    Category_GetCategoriesQuery,
    any,
    Category_GetCategoriesQueryVariables,
    any
  >(
    [queryKeys.getCategories],
    async ({pageParam = 0}) => {
      return fetcher<
        Category_GetCategoriesQuery,
        Category_GetCategoriesQueryVariables
      >(GET_ALL_CATEGORIES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Category_GetCategoriesQuery,
        allPages: Category_GetCategoriesQueryVariables[],
      ) => {
        if (lastPage?.category_getCategories?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.category_getCategories?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useCreateUserCategories = () => {
  return useMutation<
    UserCategory_CreateByCategoryIdsMutation,
    any,
    UserCategory_CreateByCategoryIdsMutationVariables
  >(
    ({categoryIds, userId}) => {
      return fetcher<
        UserCategory_CreateByCategoryIdsMutation,
        UserCategory_CreateByCategoryIdsMutationVariables
      >(CREATE_USER_CATEGORIES, {
        categoryIds,
        userId,
      })();
    },
    {
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useCreateCategory = () => {
  return useMutation<
    Category_CreateCategoryMutation,
    any,
    Category_CreateCategoryMutationVariables
  >(
    (input: any) => {
      return fetcher<
        Category_CreateCategoryMutation,
        Category_CreateCategoryMutationVariables
      >(CREATE_CATEGORIES, {
        input,
      })();
    },
    {
      onError: (errorData: any) => {
        snackBar({
          message: JSON.stringify(errorData),
          color: Colors.error,
        });
      },
    },
  );
};

export const useGetPostCategories = (options?: any) => {
  return useInfiniteQuery<
    Category_GetCategoriesQuery,
    any,
    Category_GetCategoriesQueryVariables,
    any
  >(
    [queryKeys.getPostCategories],
    async ({pageParam = 0}) => {
      return fetcher<
        Category_GetCategoriesQuery,
        Category_GetCategoriesQueryVariables
      >(GET_ALL_CATEGORIES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Category_GetCategoriesQuery,
        allPages: Category_GetCategoriesQueryVariables[],
      ) => {
        if (lastPage?.category_getCategories?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.category_getCategories?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetPostsByCategoryAndFileType = ({
  fromDate,
  toDate,
  fileType,
  options,
}: {
  fromDate: any;
  toDate: any;
  fileType: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Post_GetPostsByCategoryAndFileType,
    any,
    Post_GetPostsByCategoryAndFileTypeQueryVariables,
    any
  >(
    [queryKeys.post_getPostsByCategoryAndFileType, fromDate, toDate, fileType],
    async ({pageParam = 0}) => {
      return fetcher<
        Post_GetPostsByCategoryAndFileType,
        Post_GetPostsByCategoryAndFileTypeQueryVariables
      >(post_getPostsByCategoryAndFileType, {
        fromDate,
        toDate,
        fileType,
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Post_GetPostsByCategoryAndFileType,
        allPages: Post_GetPostsByCategoryAndFileType[],
      ) => {
        if (
          lastPage?.post_getPostsByCategoryAndFileType?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.post_getPostsByCategoryAndFileType?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
