// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import app from '../../src/app';
import request from 'supertest';
import 'jest-extended';

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Joueur1' });

    await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'Joueur2' });
  });

  it('devrait redémarrer le jeu avec succès (scénario principal)', async () => {

    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it('devrait supprimer tous les joueurs (postcondition)', async () => {

    await request(app).get('/api/v1/jeu/redemarrerJeu');

    const response = await request(app)
      .post('/api/v1/jeu/demarrerJeu')
      .send({ nom: 'TestJoueur' });

    expect(response.status).toBe(201);
  });

});
