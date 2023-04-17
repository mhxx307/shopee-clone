import { useMutation, useQuery } from 'react-query';
import { Button, DateSelect, InputField } from 'src/components/shared';
import userService from 'src/services/user.service';
import { UserSchema, userSchema } from 'src/utils/schema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from 'src/contexts/app.context';
import { saveProfile } from 'src/utils';

type FormState = Pick<
    UserSchema,
    'address' | 'date_of_birth' | 'avatar' | 'name' | 'phone'
>;

const profileSchema = userSchema.pick([
    'name',
    'phone',
    'address',
    'date_of_birth',
    'avatar',
]);

export default function Profile() {
    const { setProfile } = useAppContext();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormState>({
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            date_of_birth: new Date(1990, 0, 1),
            avatar: '',
        },
        resolver: yupResolver(profileSchema),
    });
    const { data, refetch } = useQuery({
        queryKey: 'profile',
        queryFn: userService.getProfile,
    });
    const updateProfileMutation = useMutation({
        mutationFn: userService.updateProfile,
    });
    const profile = data?.data.data;

    const handleSave = async (data: FormState) => {
        const response = await updateProfileMutation.mutateAsync({
            ...data,
            date_of_birth: data.date_of_birth?.toISOString(),
        });
        refetch();
        setProfile(response.data.data);
        saveProfile(response.data.data);
        toast.success('Cập nhật thành công');
    };

    useEffect(() => {
        if (profile) {
            setValue('name', profile.name);
            setValue('phone', profile.phone);
            setValue('address', profile.address);
            setValue(
                'date_of_birth',
                profile.date_of_birth
                    ? new Date(profile.date_of_birth)
                    : new Date(1990, 0, 1),
            );
            setValue('avatar', profile.avatar);
        }
    }, [profile, setValue]);

    if (!profile) return <div>Not have profile</div>;

    return (
        <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
            <div className="border-b border-b-gray-200 py-6">
                <h1 className="text-lg font-medium capitalize text-gray-900">
                    Hồ Sơ Của Tôi
                </h1>
                <div className="mt-1 text-sm text-gray-700">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
            </div>
            <form
                className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
                onSubmit={handleSubmit(handleSave)}
            >
                <div className="mt-6 flex-grow md:mt-0 md:pr-12">
                    <div className="flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Email
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <div className="pt-3 text-gray-700">
                                {profile.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Tên
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField name="name" control={control} />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Số điện thoại
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField
                                name="phone"
                                control={control}
                                onlyNumber
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
                            Địa chỉ
                        </div>
                        <div className="sm:w-[80%] sm:pl-5">
                            <InputField name="address" control={control} />
                        </div>
                    </div>
                    <Controller
                        name="date_of_birth"
                        control={control}
                        render={({ field }) => (
                            <DateSelect
                                value={field.value}
                                onChange={field.onChange}
                                errorMessage={errors.date_of_birth?.message}
                            />
                        )}
                    />
                    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
                        <div className="flex justify-end truncate pt-3 capitalize sm:w-[33%] sm:text-right">
                            <Button primary className="px-5" type="submit">
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
                    <div className="flex flex-col items-center">
                        <div className="my-5 h-24 w-24">
                            <img
                                src="https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn"
                                alt=""
                                className="w-full rounded-full object-cover"
                            />
                        </div>
                        <input
                            className="hidden"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                        />
                        <button
                            type="button"
                            className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
                        >
                            Chọn ảnh
                        </button>
                        <div className="mt-3 text-gray-400">
                            <div>Dụng lượng file tối đa 1 MB</div>
                            <div>Định dạng:.JPEG, .PNG</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
