
using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LikesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserLike> GetUserLike(int sourceuserId, int targetUserId)
        {
            return await _context.Likes.FindAsync(sourceuserId, targetUserId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users =  _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                users = likes.Where(l => l.SourceUserId == likesParams.UserId)
                    .Select(l => l.TargetUser);
            }

            if (likesParams.Predicate == "likedBy")
            {
                users = likes.Where(l => l.TargetUserId == likesParams.UserId)
                    .Select(u => u.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto{
                Id = user.Id,
                UserName = user.UserName,
                Age = user.DateOfBirth.CalculateAge(),
                KnownAs = user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City
            });

            return await PagedList<LikeDto>.CreateAsync(
                likedUsers,
                likesParams.PageNumber, 
                likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users 
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}