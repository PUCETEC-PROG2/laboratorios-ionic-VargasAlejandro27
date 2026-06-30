import React, { useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonLoading, IonText, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import LoadingSpinners from '../components/LoadingSpinners';
import { getUserRepos, updateRepository, deleteRepository } from '../service/GithubServices';
import { Repository } from '../Interface/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const repos = await getUserRepos();
      const mappedRepos: Repository[] = repos.map((repo) => ({
        name: repo.name,
        owner: repo.owner.login,
        avatarUrl: repo.owner.avatar_url,
        description: repo.description ?? 'Sin descripción disponible.',
        language: repo.language ?? 'N/A'
      }));
      setRepositoryList(mappedRepos);
    } catch (err) {
      console.error('Error obteniendo repositorios:', err);
      setErrorMsg('Error obteniendo repositorios: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRepo = async (owner: string, name: string) => {
    const confirmed = window.confirm(`¿Eliminar el repositorio ${name}? Esta acción no se puede deshacer.`);
    if (!confirmed) {
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await deleteRepository(owner, name);
      await fetchRepos();
    } catch (err) {
      console.error('Error eliminando repositorio:', err);
      setErrorMsg('Error eliminando repositorio: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRepo = async (repository: Repository) => {
    const newName = window.prompt('Nuevo nombre del repositorio:', repository.name);
    if (newName === null) {
      return;
    }

    const newDescription = window.prompt('Nueva descripción del repositorio:', repository.description);
    if (newDescription === null) {
      return;
    }

    const payload: { name?: string; description?: string } = {};
    if (newName.trim() && newName.trim() !== repository.name) {
      payload.name = newName.trim();
    }
    if (newDescription.trim() !== repository.description) {
      payload.description = newDescription.trim();
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const updated = await updateRepository(repository.owner, repository.name, payload);
      if (updated) {
        await fetchRepos();
      } else {
        setErrorMsg('No se pudo actualizar el repositorio.');
      }
    } catch (err) {
      console.error('Error actualizando repositorio:', err);
      setErrorMsg('Error actualizando repositorio: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Laboratorio 8: API REST</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonLoading isOpen={loading} message={'Cargando...'} />

        {errorMsg && (
          <IonText color="danger" className="ion-padding">
            <p>{errorMsg}</p>
          </IonText>
        )}

        {!loading && !errorMsg ? (
          <IonList className="repo-list">
            {repositoryList.map((repo) => (
              <RepoItem
                key={`${repo.owner}/${repo.name}`}
                {...repo}
                onEdit={() => handleEditRepo(repo)}
                onDelete={() => handleDeleteRepo(repo.owner, repo.name)}
              />
            ))}
          </IonList>
        ) : loading ? (
          <LoadingSpinners />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;