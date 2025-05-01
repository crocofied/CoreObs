import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

interface AddRequest {
    host: boolean;
    hostServer: number;
    name: string;
    icon: string;
    os: string;
    ip: string;
    url: string;
    cpu: string;
    gpu: string;
    ram: string;
    disk: string;
    monitoring: boolean;
    monitoringURL: string;
    m_cpu: boolean;
    m_gpu: boolean;
    m_ram: boolean;
    m_disk: boolean;
    m_temp: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const body: AddRequest = await request.json();
        const { host, hostServer, name, icon, os, ip, url, cpu, gpu, ram, disk, monitoring, monitoringURL, m_cpu, m_gpu, m_ram, m_disk, m_temp } = body;  
        
        const server = await prisma.server.create({
            data: {
                host,
                hostServer,
                name,
                icon,
                os,
                ip,
                url,
                cpu,
                gpu,
                ram,
                disk,
                monitoring,
                monitoringURL,
                m_cpu,
                m_gpu,
                m_ram,
                m_disk,
                m_temp
            }
        });

        return NextResponse.json({ message: "Success", server });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
