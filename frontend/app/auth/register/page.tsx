"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "",
  })
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    console.log(formData);


    let endpoint = "";
    if (formData.userType === "client") {
      endpoint = `${API_URL}/api/client/register`;
    } else if (formData.userType === "professional") {
      endpoint = `${API_URL}/api/professional/register`;
    } else if (formData.userType === "salon_admin") {
      endpoint = `${API_URL}/api/admin/register`;
    } else {
      alert("Selecione o tipo de usuário!");
      setLoading(false);
      return;
    }

    // Requisição com o backend
    try {
      // Cadastro
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      alert(data.error || data.message || "Erro ao cadastrar");

      if (!response.ok) {
        setLoading(false);
        return;
      }


      // Cadastro realizado com sucesso
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      const token = await userCredential.user.getIdToken(true); 
      localStorage.setItem("token", token);

      localStorage.setItem("token", token);
      localStorage.setItem("userType", formData.userType);

      // Redireciona para a página inicial ou dashboard
      router.push("/");

    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error)
      alert("Erro ao registrar usuário. Por favor, tente novamente.")
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFEFEF] to-white dark:from-[#18181b] dark:to-[#232326] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Calendar className="w-10 h-10 text-[#FF96B2] dark:text-[#F472B6]" />
            <span className="text-2xl font-bold text-[#313131] dark:text-white">BeautyBook</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white dark:bg-[#232326] w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#313131] dark:text-white">Criar conta</CardTitle>
            <CardDescription className="dark:text-[#d1d5db]">Junte-se à nossa plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-[#d1d5db]">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-[#d1d5db]">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-[#d1d5db]">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ex: +55 (11) 99999-9999"
                    className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="dark:text-[#d1d5db]">Tipo de usuário</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                  <SelectTrigger className="border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#232326] dark:text-white">
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="professional">Profissional</SelectItem>
                    <SelectItem value="salon_admin">Administrador do Salão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-[#d1d5db]">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10 border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                    ) : (
                      <Eye className="w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="dark:text-[#d1d5db]">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-[#313131]/50 dark:text-[#d1d5db]/50" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    className="pl-10 border-[#EFEFEF] focus:border-[#FF96B2] dark:bg-[#18181b] dark:border-[#232326] dark:text-white dark:focus:border-[#F472B6]"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

                <Button
                type="submit"
                className="w-full bg-[#FF96B2] hover:bg-[#FF96B2]/90 text-white dark:bg-[#F472B6] dark:hover:bg-[#F472B6]/90 flex items-center justify-center"
                disabled={loading}
                >
                {loading && (
                  <svg
                  className="animate-spin mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                  </svg>
                )}
                Criar conta
                </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#313131]/70 dark:text-[#d1d5db]/70">
                Já tem uma conta?{" "}
                <Link href="/auth/login" className="text-[#FF96B2] hover:underline font-medium dark:text-[#F472B6]">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
