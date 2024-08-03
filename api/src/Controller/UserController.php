<?php
// src/Controller/UserController.php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;

class UserController extends AbstractController
{
    private $entityManager;
    private $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/api/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request): Response
    {
        // Récupérer le contenu de la requête
        $jsonContent = $request->getContent();

        // Décoder le JSON en tableau PHP
        $data = json_decode($jsonContent, true);

        // Vérifier si le JSON est valide
        if ($data === null) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        // Traiter les données
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        // Vérifier si les champs requis sont présents
        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email and password are required'], Response::HTTP_BAD_REQUEST);
        }

        // Charger l'utilisateur par le nom d'utilisateur
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        // Vérifier si l'utilisateur existe et le mot de passe est correct
        if ($user && $this->passwordHasher->isPasswordValid($user, $password)) {
            // Récupérer les informations de l'utilisateur
            $userData = [
                'id' => $user->getId(),
                'pseudo' => $user->getPseudo(),
                'roles' => $user->getRoles(),
            ];

            return new JsonResponse(['message' => 'Login successful', 'user' => $userData], Response::HTTP_OK);
        } else {
            return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }
    }
}