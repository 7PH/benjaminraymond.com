import './ContactSection.scss';
import MyTitle from '../util/MyTitle';


function ContactSection() {
    return (
        <div className='section section-half'>
            <div className='row h-100'>
                <div className='col-md-6'>
                </div>
                <div className='col-md-5 d-flex flex-column justify-content-end mb-5'>

                    <MyTitle className='text-center' />

                    <div className='btn-group mx-5 mt-4'>
                        <a className='btn btn-outline-secondary' target='_blank' href='https://github.com/7PH' rel='noreferrer'>GitHub</a>
                        <a className='btn btn-outline-primary' target='_blank' href='https://www.linkedin.com/in/b-raymond/' rel='noreferrer'>LinkedIn</a>
                        <a className='btn btn-outline-danger' target='_blank' href='mailto:b.raymond@protonmail.com' rel='noreferrer'>Email</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
