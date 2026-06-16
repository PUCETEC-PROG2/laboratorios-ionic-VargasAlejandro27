import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <IonCard className="card">
            <img
              src="https://avatars.githubusercontent.com/u/191403759?v=4"
              alt="Foto de perfil"
            />
            <IonCardTitle>Alejandro Vargas Saavedra</IonCardTitle>
            <IonCardSubtitle>avvargas@puce.edu.ec</IonCardSubtitle>
            <IonCardContent>
              <p>Desarrollador de software con experiencia en el desarrollo de aplicaciones móviles y web.</p>
              <p>Si deseas contactarme, puedes enviarme un correo electrónico a avvargas@puce.edu.ec</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
