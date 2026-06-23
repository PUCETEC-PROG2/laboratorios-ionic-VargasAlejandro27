import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonText } from '@ionic/react';
import './Tab3.css';
import { getUserProfile } from '../service/GithubServices';
import { GitHubUser } from '../Interface/GitHubUsers';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const user = await getUserProfile();
        if (user) {
          setUserInfo(user);
        } else {
          setErrorMsg('No se pudo obtener la información del usuario.');
        }
      } catch (error) {
        setErrorMsg('Error al cargar la información del usuario: ' + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

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

        <IonLoading isOpen={loading} message="Cargando..." />

        {errorMsg && (
          <IonText color="danger" className="ion-padding">
            <p>{errorMsg}</p>
          </IonText>
        )}

        {!loading && !errorMsg && userInfo && (
          <div className="card-container">
            <IonCard className="card">
              <img src={userInfo.avatar_url} alt="Foto de perfil" />
              <IonCardTitle>{userInfo.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
              <IonCardContent>
                <p>Perfil de GitHub: <a href={userInfo.html_url} target="_blank" rel="noreferrer">{userInfo.html_url}</a></p>
                <p>Nombre: {userInfo.name}</p>
                <p>Usuario: {userInfo.login}</p>
                
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
