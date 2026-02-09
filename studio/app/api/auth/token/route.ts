// File path: src/app/api/auth/token/route.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { HasuraUser } from '@/lib/types';
import { getEnv } from '@/lib/env';

function jsonResponse(data: any, status: number) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ___________________ Login scenario ___________________
async function getUserByEmail(email: string): Promise<HasuraUser | undefined> {
  const GET_USER_QUERY = `
    query GetUser($email: citext!) {
      users(where: {email: {_eq: $email}}) {
        id
        displayName
        email
        passwordHash
        roles { role }
      }
    }
  `;

  const url = getEnv('HASURA_GRAPHQL_URL') || getEnv('NEXT_PUBLIC_HASURA_GRAPHQL_URL');
  const secret = getEnv('HASURA_ADMIN_SECRET') || getEnv('NEXT_PUBLIC_HASURA_ADMIN_SECRET');

  if (!url) throw new Error("Hasura URL not found");

  console.log(`[Auth] Fetching user from: ${url} `);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': secret!,
    },
    body: JSON.stringify({ query: GET_USER_QUERY, variables: { email } }),
  });
  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  return data.data?.users[0];
}

//  _______ the real post request _______

// export async function POST(request: NextRequest) {
  // try {
  //   // 1. التحقق من وجود متغيرات البيئة الأساسية
  //   const jwtSecret = getEnv('HASURA_GRAPHQL_JWT_SECRET');
  //   if (!getEnv('HASURA_GRAPHQL_URL') && !getEnv('NEXT_PUBLIC_HASURA_GRAPHQL_URL')) {
  //     console.error("FATAL: Missing Hasura URL");
  //     return jsonResponse({ message: 'خطأ في إعدادات الخادم.' }, 500);
  //   }
  //   if (!jwtSecret) {
  //     console.error("FATAL: Missing JWT Secret");
  //     return jsonResponse({ message: 'خطأ في إعدادات الخادم (JWT).' }, 500);
  //   }

    // const { email, password } = await request.json();
    // if (!email || !password) {
    //   return jsonResponse({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان.' }, 400);
    // }

    // const user = await getUserByEmail(email);
    // if (!user) {
    //   return jsonResponse({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }, 401);
    // }

    // // 2. التحقق المفصل من بيانات المستخدم القادمة من قاعدة البيانات
    // if (!user.id) {
    //   console.error("DATABASE ERROR: User found but is missing an ID.", user);
    //   return jsonResponse({ message: 'بيانات المستخدم غير مكتملة (ID مفقود).' }, 500);
    // }
    // if (!user.passwordHash) {
    //   console.error("DATABASE ERROR: User found but is missing a password hash.", user);
    //   return jsonResponse({ message: 'بيانات المستخدم غير مكتملة (كلمة المرور مفقودة).' }, 500);
    // }

    // const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    // if (!isPasswordValid) {
    //   return jsonResponse({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }, 401);
    // }

//     let jwtSecretObject;
//     try {
//       jwtSecretObject = JSON.parse(jwtSecret!);
//     } catch (e) {
//       console.error("Error parsing HASURA_GRAPHQL_JWT_SECRET:", e);
//       return jsonResponse({ message: 'خطأ في إعدادات JWT Secret بالخادم.' }, 500);
//     }

//     if (!jwtSecretObject || !jwtSecretObject.key) {
//       console.error("HASURA_GRAPHQL_JWT_SECRET is missing the 'key' property.");
//       return jsonResponse({ message: "إعدادات JWT Secret بالخادم غير مكتملة." }, 500);
//     }

//     const userRoles = Array.isArray(user.roles) ? user.roles.map(r => r.role) : [];
//     const allowedRoles = ['user', ...userRoles];
//     const defaultRole = userRoles.length > 0 ? userRoles[0] : "user";

//     const claims = {
//       "https://hasura.io/jwt/claims": {
//         "x-hasura-allowed-roles": allowedRoles,
//         "x-hasura-default-role": defaultRole,
//         "x-hasura-user-id": user.id, // استخدام user.id مباشرة
//       },
//       iat: Math.floor(Date.now() / 1000) - 30,
//     };

//     const token = jwt.sign(claims, jwtSecretObject.key, {
//       algorithm: 'HS256',
//       expiresIn: '1d',
//     });

//     const response = NextResponse.json({
//       accessToken: token,
//       user: { id: user.id, displayName: user.displayName, email: user.email, roles: allowedRoles },
//       debug: {
//         serverTime: new Date().toISOString(),
//         iat: claims.iat,
//         exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 1 day approx
//         env: process.env.NODE_ENV,
//         forwardedProto: request.headers.get('x-forwarded-proto'),
//       }
//     }, { status: 200 });

//     // Determine secure status robustly
//     const forwardedProto = request.headers.get('x-forwarded-proto');
//     // Use secure cookies if the request was made via HTTPS (either directly or via proxy)
//     // Default to false for development unless explicit
//     const isConnectionSecure = forwardedProto === 'https' || request.url.startsWith('https://');
//     const isSecure = process.env.NODE_ENV === 'production' ? isConnectionSecure : false;

//     console.log(`[Auth] Setting cookie. Secure: ${isSecure}, ForwardedProto: ${forwardedProto}`);

//     response.cookies.set({
//       name: 'token',
//       value: token,
//       httpOnly: false, // Client needs to read this for AuthContext
//       secure: isSecure, // Only set secure if we are confident it is HTTPS
//       sameSite: 'lax',
//       path: '/',
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//     });

//     return response;

//   } catch (error: any) {
//     console.error("CRITICAL ERROR in token generation route:", error);
//     return jsonResponse({ message: error.message || 'An unexpected error occurred' }, 500);
//   }
// }


export async function POST(request: NextRequest) {
  try {
    // 1. التحقق من وجود متغيرات البيئة الأساسية
    const jwtSecret = getEnv('HASURA_GRAPHQL_JWT_SECRET');
    if (!getEnv('HASURA_GRAPHQL_URL') && !getEnv('NEXT_PUBLIC_HASURA_GRAPHQL_URL')) {
      console.error("FATAL: Missing Hasura URL");
      return jsonResponse({ message: 'خطأ في إعدادات الخادم.' }, 500);
    }
    if (!jwtSecret) {
      console.error("FATAL: Missing JWT Secret");
      return jsonResponse({ message: 'خطأ في إعدادات الخادم (JWT).' }, 500);
    }
    const { mode, email, password, confirmPassword } = await request.json();

    if (!email || !password) {
      return jsonResponse({ message: 'البريد الإلكتروني وكلمة المرور مطلوبان.' }, 400);
    }

    // ----------------- Internal helper: JWT + Cookie -----------------
    async function generateTokenResponse(user: HasuraUser) {
      // الجزء اللي بعتهولي حرفيًا، بدون أي تغيير
      let jwtSecretObject;
      try {
        jwtSecretObject = JSON.parse(getEnv('HASURA_GRAPHQL_JWT_SECRET')!);
      } catch (e) {
        console.error("Error parsing HASURA_GRAPHQL_JWT_SECRET:", e);
        return jsonResponse({ message: 'خطأ في إعدادات JWT Secret بالخادم.' }, 500);
      }

      if (!jwtSecretObject || !jwtSecretObject.key) {
        console.error("HASURA_GRAPHQL_JWT_SECRET is missing the 'key' property.");
        return jsonResponse({ message: "إعدادات JWT Secret بالخادم غير مكتملة." }, 500);
      }

      const userRoles = Array.isArray(user.roles) ? user.roles.map(r => r.role) : [];
      const allowedRoles = ['user', ...userRoles];
      const defaultRole = userRoles.length > 0 ? userRoles[0] : "user";

      const claims = {
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": allowedRoles,
          "x-hasura-default-role": defaultRole,
          "x-hasura-user-id": user.id,
        },
        iat: Math.floor(Date.now() / 1000) - 30,
      };

      const token = jwt.sign(claims, jwtSecretObject.key, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });

      const response = NextResponse.json({
        accessToken: token,
        user: { id: user.id, displayName: user.displayName, email: user.email, roles: allowedRoles },
        debug: {
          serverTime: new Date().toISOString(),
          iat: claims.iat,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          env: process.env.NODE_ENV,
          forwardedProto: request.headers.get('x-forwarded-proto'),
        }
      }, { status: 200 });

      const forwardedProto = request.headers.get('x-forwarded-proto');
      const isConnectionSecure = forwardedProto === 'https' || request.url.startsWith('https://');
      const isSecure = process.env.NODE_ENV === 'production' ? isConnectionSecure : false;

      console.log(`[Auth] Setting cookie. Secure: ${isSecure}, ForwardedProto: ${forwardedProto}`);

      response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: false,
        secure: isSecure,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // ----------------- SIGNUP -----------------
    if (mode === "signup") {
      if (password !== confirmPassword) {
        return jsonResponse({ message: 'كلمة المرور وتأكيدها غير متطابقين.' }, 400);
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) return jsonResponse({ message: 'البريد الإلكتروني مستخدم بالفعل.' }, 400);

      const hashedPassword = await bcrypt.hash(password, 10);


      const INSERT_USER_MUTATION = `
        mutation insertUser($object: users_insert_input!) {
          insertUser(object: $object) {
            id
            email
            passwordHash
          }
        }
      `;
      const url = getEnv('HASURA_GRAPHQL_URL') || getEnv('NEXT_PUBLIC_HASURA_GRAPHQL_URL');
      const secret = getEnv('HASURA_ADMIN_SECRET') || getEnv('NEXT_PUBLIC_HASURA_ADMIN_SECRET');

      const res = await fetch(url!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': secret! },
        body: JSON.stringify({
          query: INSERT_USER_MUTATION,
          variables: { object: { email, passwordHash: hashedPassword, locale: 'en' } },
        }),
      });

      const data = await res.json();
      if (data.errors) {
        console.error("GRAPHQL ERROR:", data.errors);
        return jsonResponse({ message: data.errors[0].message }, 500);
      }

      const user: HasuraUser = {
        id: data.data.insertUser.id,
        email,
        passwordHash: hashedPassword,
        displayName: "",
        roles: [],
      };

      // فورًا عمل JWT + Cookie للمستخدم الجديد
      return generateTokenResponse(user);
    }

    // ----------------- LOGIN -----------------
    const user = await getUserByEmail(email);
    if (!user) {
      return jsonResponse({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }, 401);
    }

    // 2. التحقق المفصل من بيانات المستخدم القادمة من قاعدة البيانات
    if (!user.id) {
      console.error("DATABASE ERROR: User found but is missing an ID.", user);
      return jsonResponse({ message: 'بيانات المستخدم غير مكتملة (ID مفقود).' }, 500);
    }

    // التحقق من كلمة المرور
    if (!user.passwordHash) {
      console.error("DATABASE ERROR: User found but is missing a password hash.", user);
      return jsonResponse({ message: 'بيانات المستخدم غير مكتملة (كلمة المرور مفقودة).' }, 500);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return jsonResponse({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' }, 401);
    }

    // JWT + Cookie للمستخدم الحالي
    return generateTokenResponse(user);

  } catch (error: any) {
    console.error("CRITICAL ERROR in auth POST route:", error);
    return jsonResponse({ message: error.message || 'حدث خطأ غير متوقع' }, 500);
  }
}