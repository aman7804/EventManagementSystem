using System.Linq.Expressions;
using System.Reflection;

namespace EMS.Service.Extension
{

    public static class LinqExtensions
    {
        private static PropertyInfo GetPropertyInfo(Type objType, string name)
        {
            var properties = objType.GetProperties();
            var matchedProperty = properties.FirstOrDefault(p => p.Name == name);
            return matchedProperty ?? throw new ArgumentException(null, nameof(name));
        }
        private static LambdaExpression GetOrderExpression(Type objType, PropertyInfo pi)
        {
            var paramExpr = Expression.Parameter(objType);
            var propAccess = Expression.PropertyOrField(paramExpr, pi.Name);
            var expr = Expression.Lambda(propAccess, paramExpr);
            return expr;
        }

        private static (MethodInfo? genericMethod, LambdaExpression? expr) GetGenericMethodForOrderBy<T>(string name, MethodInfo? method)
        {
            var propInfo = GetPropertyInfo(typeof(T), name);
            var expr = GetOrderExpression(typeof(T), propInfo);
            var genericMethod = method == null
                    ? throw new ArgumentException(null, nameof(name))
                    : method.MakeGenericMethod(typeof(T), propInfo.PropertyType);
            return (genericMethod, expr);
        }

        public static IEnumerable<T> OrderBy<T>(this IEnumerable<T> query, string name)
        {
            try
            {
                var method = typeof(Enumerable).GetMethods().FirstOrDefault(m => m.Name == "OrderBy" && m.GetParameters().Length == 2);
                var (genericMethod, expr) = GetGenericMethodForOrderBy<T>(name, method);
                
                return genericMethod.Invoke(null, new object[] { query, expr.Compile() }) as IEnumerable<T>;
            }
            catch { return query; }
        }

        public static IEnumerable<T> OrderByDescending<T>(this IEnumerable<T> query, string name)
        {
            try
            {
                var method = typeof(Enumerable).GetMethods().FirstOrDefault(m => m.Name == "OrderByDescending" && m.GetParameters().Length == 2);
                var (genericMethod, expr) = GetGenericMethodForOrderBy<T>(name, method);

                return genericMethod.Invoke(null, new object[] { query, expr.Compile() }) as IEnumerable<T>;
            }
            catch { return query; }
        }

        public static IQueryable<T> OrderBy<T>(this IQueryable<T> query, string name)
        {
            try
            {
                var method = typeof(Queryable).GetMethods().FirstOrDefault(m => m.Name == "OrderBy" && m.GetParameters().Length == 2);
                var (genericMethod, expr) = GetGenericMethodForOrderBy<T>(name, method);

                return genericMethod.Invoke(null, new object[] { query, expr }) as IQueryable<T>;
            }
            catch { return query; }
        }

        public static IQueryable<T> OrderByDescending<T>(this IQueryable<T> query, string name)
        {
            try
            {
                var method = typeof(Queryable).GetMethods().FirstOrDefault(m => m.Name == "OrderByDescending" && m.GetParameters().Length == 2);
                var (genericMethod, expr) = GetGenericMethodForOrderBy<T>(name, method);

                return genericMethod.Invoke(null, new object[] { query, expr }) as IQueryable<T>;
            }
            catch { return query; }
        }
    }
}
