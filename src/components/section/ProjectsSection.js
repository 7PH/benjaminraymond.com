import './ProjectsSection.scss';


function ProjectsSection() {
    return (
        <div className='section d-flex flex-column justify-content-center text-center'>

            <h1>Projects</h1>

            <div className='row justify-content-center'>
                <div className='col-lg-4 col-md-6'>
                    <div className='card bg-dark my-3'>
                        <div className="card-body">
                            <h5 className="card-title">domaTeX</h5>
                            <p className="card-text">A SaaS for mathematics teacher to create documents online</p>
                            <a href="https://domatex.fr/documents/creer-devoir/" target='_blank' rel="noreferrer" className="btn btn-primary">Try the UI</a>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='card bg-dark my-3'>
                        <div className="card-body">
                            <h5 className="card-title">RisiBank</h5>
                            <p className="card-text">Humorous image bank</p>
                            <a href="https://risibank.fr" target='_blank' rel="noreferrer" className="btn btn-primary">Check out</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-lg-4 col-md-6'>
                    <div className='card bg-dark my-3'>
                        <div className="card-body">
                            <h5 className="card-title">SkyChat</h5>
                            <p className="card-text">Synchronized media player with advanced chat features</p>
                            <a href="https://github.com/skychatorg/skychat" target='_blank' rel="noreferrer" className="btn btn-primary">See project</a>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='card bg-dark my-3'>
                        <div className="card-body">
                            <h5 className="card-title">PowerAudio</h5>
                            <p className="card-text">A unique audio viz library you can integrate on the web</p>
                            <a href="https://github.com/7PH/poweraudio" target='_blank' rel="noreferrer" className="btn btn-primary">See project</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsSection;
