import { Router } from "express";
import { updateProfessionalProfile, updateAvailability, listProfessionalAppointments, updateServiceDuration, registerProfessional, getProfessionalProfile, uploadProfessionalProfilePicture, listOwnServices, listPublicProfessionalServices, createProfessionalService, editProfessionalService, deleteProfessionalService, addCertification, listCertifications, deleteCertification, addPortfolioItem, listPortfolio, editPortfolioItem, deletePortfolioItem, getPublicProfessionalProfile, professionalDashboard, ratingsDistribution, professionalReviews, servicesRatings, professionalTrends, exportReviewsPdf } from "../controllers/professionalController";
import { authenticateToken } from "../middlewares/authMiddleware";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// Rota de atualização de perfil do profissional
router.put("/profile", authenticateToken, updateProfessionalProfile);

// Rota de atualização de disponibilidade do profissional
router.put("/availability", authenticateToken, updateAvailability);

// Rota para listar agendamentos do profissional
router.get("/schedules", authenticateToken, listProfessionalAppointments);

// Rota para definir tempo médio de por serviço
router.patch("/service/:serviceId/duration", authenticateToken, updateServiceDuration);

// Rota de cadastro de profissional autônomo
router.post('/register', registerProfessional);

// Rota para obter o perfil do profissional
router.get('/profile', authenticateToken, getProfessionalProfile);

// Rota para editar a foto de perfil do profissional
router.post('/profile/photo', authenticateToken, upload.single('photo'), uploadProfessionalProfilePicture);

// Rota para listar os próprios serviços do profissional
router.get("/services", authenticateToken, listOwnServices);

// Rota para listar serviços públicos de profissionais
router.get("/services-public", listPublicProfessionalServices);

// Rota para criar um novo serviço profissional
router.post("/services", authenticateToken, createProfessionalService);

// Rota para editar um serviço profissional
router.put("/services/:id", authenticateToken, editProfessionalService);

// Rota para deletar um serviço profissional
router.delete("/services/:id", authenticateToken, deleteProfessionalService);

// Rota para adicionar certificação profissional
router.post("/certifications", authenticateToken, addCertification);

// Rota para listar certificações profissionais
router.get("/certifications", authenticateToken, listCertifications);

// Rota para deletar certificação profissional
router.delete("/certifications/:id", authenticateToken, deleteCertification);

// Rota para adicionar item ao portfólio do profissional
router.post("/portfolio", authenticateToken, addPortfolioItem);

// Rota para listar itens do portfólio do profissional
router.get("/portfolio", authenticateToken, listPortfolio);

// Rota para editar item do portfólio do profissional
router.put("/portfolio/:id", authenticateToken, editPortfolioItem);

// Rota para deletar item do portfólio do profissional
router.delete("/portfolio/:id", authenticateToken, deletePortfolioItem);

// Rota para obter o perfil público do profissional
router.get("/public-profile/:id", getPublicProfessionalProfile);

// Rota para o dashboard do profissional
router.get("/dashboard", authenticateToken, professionalDashboard);

// Rota para distribuição de avaliações do profissional
router.get("/reports/ratings-distribution", authenticateToken, ratingsDistribution);

// Rota de listagem de avaliações do profissional
router.get("/reports/reviews", authenticateToken, professionalReviews);

// Rota de avaliações dos serviços do profissional
router.get("/reports/services-ratings", authenticateToken, servicesRatings);

// Rota de tendências do profissional
router.get("/reports/trends", authenticateToken, professionalTrends);

// Rota para exportar avaliações do profissional em PDF
router.get("/reports/reviews/pdf", authenticateToken, exportReviewsPdf);

export default router;