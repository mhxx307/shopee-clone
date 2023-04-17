import { useAppContext } from 'src/contexts/app.context';

function Avatar() {
    const { profile } = useAppContext();

    return (
        <div className="flex-center cursor-pointer">
            <div className="mr-2 h-6 w-6 flex-shrink-0">
                <img
                    src={
                        profile?.avatar
                            ? profile.avatar
                            : 'https://camo.githubusercontent.com/9f35070e23b2720cc87542cad46767ba9851c0ec956f58b0a4bc72d6e7a41372/68747470733a2f2f692e696d6775722e636f6d2f33786a4b50767a2e706e67'
                    }
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                />
            </div>
            <p className="text-white/80">{profile?.email}</p>
        </div>
    );
}

export default Avatar;
