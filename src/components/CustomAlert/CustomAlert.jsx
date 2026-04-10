import './CustomAlert.css';
import { useNavigate } from 'react-router-dom';

const CustomAlert = ({ message, onClose }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        onClose();
        navigate('/');
        window.scrollTo(0, 0); // Opcional, para asegurarse de ir bien arriba
    };

    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert-box">
                <p>{message}</p>
                <button onClick={handleAction} className="custom-alert-btn">BACK</button>
            </div>
        </div>
    );
};

export default CustomAlert;
