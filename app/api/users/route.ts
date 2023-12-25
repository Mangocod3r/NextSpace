// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     const users = await prisma.user.findMany();
//     console.log(users);

//     return NextResponse.json(users);
// }
import { authOptions } from "@/app/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;

    if (!currentUserEmail) {
        // Handle the case where email is not available
        return NextResponse.error();
    }

    const data = await request.json();
    data.age = Number(data.age);

    const user = await prisma.user.update({
        where: {
            email: currentUserEmail,
        },
        data,
    });

    return NextResponse.json(user);
}

export async function GET(request: Request) {
    const users = await prisma.user.findMany();
    console.log(users);

    return NextResponse.json(users);
}
// export async function GET({params}: any) {
//     const user = await prisma.user.findUnique({ where: { id: params.id } });
//     console.log(user);
  
//       return NextResponse.json(user);
//   }

