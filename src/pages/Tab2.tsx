import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar, IonLoading, IonText } from '@ionic/react';
import './Tab2.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../Interface/RepositoryOayload';
import { createRepository } from '../service/GithubServices';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async () => {
    if (!repositoryData.name.trim()) {
      setErrorMsg('El nombre del repositorio es requerido');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const result = await createRepository(repositoryData);
      if (result) {
        setSuccessMsg(`¡Repositorio ${result.name} creado exitosamente!`);
        setRepositoryData({ name: '', description: '' });
        setTimeout(() => {
          history.push('/tabs/tab1');
        }, 2000);
      } else {
        setErrorMsg('Error al crear el repositorio');
      }
    } catch (error) {
      setErrorMsg('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message="Guardando..." />

        {errorMsg && (
          <IonText color="danger" className="ion-padding">
            <p>{errorMsg}</p>
          </IonText>
        )}

        {successMsg && (
          <IonText color="success" className="ion-padding">
            <p>{successMsg}</p>
          </IonText>
        )}

        <div className="container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={repositoryData.name}
            onIonChange={(e) => setRepositoryData({ ...repositoryData, name: e.detail.value! })}
          />

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            placeholder="Ingrese la descripción del repositorio"
            labelPlacement="floating"
            rows={4}
            value={repositoryData.description}
            onIonChange={(e) => setRepositoryData({ ...repositoryData, description: e.detail.value! })}
          />

          <IonButton
            className="save-button"
            expand="block"
            fill="solid"
            onClick={handleSave}
            disabled={loading}
          >
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
