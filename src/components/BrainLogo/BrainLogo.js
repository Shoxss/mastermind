import React from 'react';
import styles from './BrainLogo.module.css';

// import { ReactComponent as BrainSilhouette } from '../../media/BrainSilhouette.svg';
// import { ReactComponent as Cog } from '../../media/Cog.svg';
import { default as BrainSilhouette } from '../../media/BrainSilhouette.svg';
import { default as Cog1 } from '../../media/Cog1.svg';
import { default as Cog2 } from '../../media/Cog2.svg';
import { default as Cog3 } from '../../media/Cog3.svg';

const BrainLogo = () => (
  <div id="brain-container" className={styles.BrainLogo} data-testid="BrainLogo">
    <div id="brain-cog1" className={styles.BrainCog1}><img src={Cog1} alt="brain cog 1"/></div>
    <div id="brain-cog2" className={styles.BrainCog2}><img src={Cog2} alt="brain cog 2"/></div>
    <div id="brain-cog3" className={styles.BrainCog3}><img src={Cog3} alt="brain cog 3"/></div>
    <img className={styles.BrainSilhouette} src={BrainSilhouette} alt="brain silhouette"/>
  </div>
);

export default BrainLogo;
