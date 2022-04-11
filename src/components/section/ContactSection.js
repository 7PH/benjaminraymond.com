import './ContactSection.scss';
import MyTitle from '../util/MyTitle';


function ContactSection() {
    return (
        <div className='section'>
            <div className='row h-100'>
                <div className='col-md-6'>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-end mb-5'>
                    <MyTitle className='text-center' />
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
