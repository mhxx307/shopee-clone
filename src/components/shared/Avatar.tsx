import { useAppContext } from 'src/contexts/app.context';
import { getAvatarUrl } from 'src/utils';

function Avatar() {
    const { profile } = useAppContext();

    return (
        <div className="flex-center cursor-pointer">
            <div className="mr-2 h-6 w-6 flex-shrink-0">
                <img
                    src={getAvatarUrl(profile?.avatar)}
                    alt={profile?.name || ''}
                    className="h-full w-full rounded-full object-cover"
                />
            </div>
            <p className="text-white/80">{profile?.email}</p>
        </div>
    );
}

export default Avatar;
