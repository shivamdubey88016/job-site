import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div>

                                <Link to="/login"> <Button className='bg-red-600 text-white hover:bg-red-700 m-2 hover:bg-green-400'>Login </Button></Link>
                                <Link to="/signup"> <Button className='bg-red-600 text-white hover:bg-red-700 m-2 hover:bg-green-400'>Sign Up</Button></Link>
                            </div>) : (








                            <Popover>
                                <PopoverTrigger className='cursor-pointer'>

                                    <Avatar>
                                        <AvatarImage  src="https://github.com/shadcn.png" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-88 bg-white shadow-lg'>
                                    <div className='flex gap-4'>

                                        <Avatar>
                                            <AvatarImage  src="https://github.com/shadcn.png" />

                                        </Avatar>
                                        <div> <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm tet-munted-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto magni amet tempora tenetur totam commodi reprehenderit</p>


                                        </div>
                                        <div className='flex flex-col gap-2 mt-4'>
                                            <div className='flex flex-col gap-2 bg-gray-100 p-2 rounded-md'>
                                                <User2 />
                                                {
                                                    user && user.role === "student" &&(  <Button variant="link"><Link to="/profile">view profile</Link> </Button>)




                                                }
                                              

                                            </div>
                                            <div className='flex flex-col gap-2 bg-gray-100 p-2 rounded-md'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>

                            </Popover>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar