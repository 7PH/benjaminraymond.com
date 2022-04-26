import './ContactSection.scss';
import MyTitle from '../util/MyTitle';


function ContactSection() {
    return (
        <div className='section section-half'>
            <div className='w-full h-full grid grid-cols-2 gap-4'>
                <div className='col-start-1 col-span-2 xl:col-start-2 xl:col-span-1 flex flex-col justify-end mb-5'>

                    <MyTitle className='text-center' />

                    <div className='mx-5 mt-4 text-center'>
                        <a className='mx-2 btn btn-pink' target='_blank' href='https://github.com/7PH' rel='noreferrer'>GitHub</a>
                        <a className='mx-2 btn btn-blue' target='_blank' href='https://www.linkedin.com/in/b-raymond/' rel='noreferrer'>LinkedIn</a>
                        <a className='mx-2 btn btn-violet' target='_blank' href='mailto:b.raymond@protonmail.com' rel='noreferrer'>Email</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
