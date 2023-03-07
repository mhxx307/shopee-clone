function Avatar() {
    return (
        <div className="flex-center cursor-pointer">
            <div className="mr-2 h-6 w-6 flex-shrink-0">
                <img
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="avatar"
                    className="h-full w-full rounded-full object-cover"
                />
            </div>
            <p>La Võ Minh Quân</p>
        </div>
    );
}

export default Avatar;
