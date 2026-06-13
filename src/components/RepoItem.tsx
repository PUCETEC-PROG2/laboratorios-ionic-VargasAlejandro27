import React from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../Interface/Repository';
import './RepoItem.css';

const RepoItem: React.FC<Repository> = (repository) => {
  return (
    <IonItemSliding className="repo-item">
      <IonItem className="repo-item__item">
        <IonThumbnail slot="start">
          <img src={repository.avatarUrl} alt="Avatar" />
        </IonThumbnail>
        <IonLabel>
          <h3>{repository.name}</h3>
          <p className="owner">@{repository.owner}</p>
          <p>{repository.description}</p>
          <p>
            <strong>Lenguaje:</strong> {repository.language}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>
        <IonItemOption color="danger">
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
