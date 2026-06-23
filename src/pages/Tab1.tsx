import React, { useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonLoading, IonText, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import LoadingSpinners from '../components/LoadingSpinners';
import { getUserRepos } from '../service/GithubServices';
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
              <RepoItem key={`${repo.owner}/${repo.name}`} {...repo} />
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